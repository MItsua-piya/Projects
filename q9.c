#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/wait.h>
#include <string.h>

void lock_region(int fd, off_t start, off_t length)
{
    struct flock lock;

    lock.l_type = F_WRLCK;
    lock.l_whence = SEEK_SET;
    lock.l_start = start;
    lock.l_len = length;
    lock.l_pid = getpid();

    if (fcntl(fd, F_SETLK, &lock) == -1)
    {
        perror("fcntl - lock");
        exit(1);
    }
}

void unlock_region(int fd, off_t start, off_t length)
{
    struct flock lock;

    lock.l_type = F_UNLCK;
    lock.l_whence = SEEK_SET;
    lock.l_start = start;
    lock.l_len = length;

    if (fcntl(fd, F_SETLK, &lock) == -1)
    {
        perror("fcntl - unlock");
        exit(1);
    }
}

int main()
{
    const char *filename = "q9_file.txt";

    /* Create a 100-byte file */
    int fd = open(filename, O_RDWR | O_CREAT | O_TRUNC, 0666);

    if (fd == -1)
    {
        perror("open");
        return 1;
    }

    char data[101];

    for (int i = 0; i < 100; i++)
        data[i] = 'A' + (i % 26);

    data[100] = '\0';

    write(fd, data, 100);
    close(fd);

    pid_t pid = fork();

    if (pid < 0)
    {
        perror("fork");
        return 1;
    }

    if (pid == 0)
    {
        /* Child: last 50 bytes */
        int child_fd = open(filename, O_RDWR);

        printf("Process 2: Trying to lock last 50 bytes...\n");
        fflush(stdout);

        lock_region(child_fd, 50, 50);

        printf("Process 2: Locked bytes 50-99.\n");
        printf("Process 2: Working...\n");
        fflush(stdout);

        sleep(5);

        unlock_region(child_fd, 50, 50);

        printf("Process 2: Unlocked last 50 bytes.\n");
        fflush(stdout);

        close(child_fd);
    }
    else
    {
        /* Parent: first 50 bytes */
        int parent_fd = open(filename, O_RDWR);

        printf("Process 1: Trying to lock first 50 bytes...\n");
        fflush(stdout);

        lock_region(parent_fd, 0, 50);

        printf("Process 1: Locked bytes 0-49.\n");
        printf("Process 1: Working...\n");
        fflush(stdout);

        sleep(5);

        unlock_region(parent_fd, 0, 50);

        printf("Process 1: Unlocked first 50 bytes.\n");
        fflush(stdout);

        close(parent_fd);

        wait(NULL);
    }

    return 0;
}