# from curses.ascii import isalpha
import random


def compare_digit(rand_str,guess):
    rabbit_count=0
    Tortoise_count=0
    for i in range(len(rand_str)):
        if guess[i] == rand_str[i]:
            rabbit_count+=1
        elif guess[i] in rand_str:
            Tortoise_count+=1
    print("You got:",rabbit_count,"Rabbit")
    print("Tortoise_count:",Tortoise_count,"Tortoise")


rand_int= random.randint(1000, 9999)
rand_str= str(rand_int)
print("System generated 4 digitnumber is:" ,rand_str)

guess= input("Enter your 4 digit number guess:")

if guess == rand_str:
    print("WINNER")
    print("Do you want to continue?")
    ch= input()
    if(ch=='Y' or ch=='y'):
        compare_digit(rand_str,guess)
    elif(ch=='N' or ch=='n'):
        exit()
elif(len(guess)!=len(rand_str)):
    print("Invalid input")
elif(guess.isalpha()):
    print("Invalid input")
else:
    print("Invalid Input")


    





































    
    # print("Do you want to continue?")
    # ch= input()
    # if(ch=='Y' or ch=='y'):
    #     compare_digit(rand_str,guess)
    # elif(ch=='N' or ch=='n'):
    #     exit()
    # else:
    #     print("Invalid input")
    #     exit()

# if guess == rand_str:
#     print("WINNER")
# else:
#     rabbit_count=0
#     Tortoise_count=0
#     for i in range(4):
#         if guess[i] == rand_str[i]:
#             rabbit_count+=1
#         elif guess[i] in rand_str:
#             Tortoise_count+=1
#     print("You got:",rabbit_count,"Rabbit")
#     print("Tortoise_count:",Tortoise_count,"Tortoise")

    

