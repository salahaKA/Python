import random

def compare_digit(rand_str,guess):
    rabbit_count=0
    tortoise_count=0
    for i in range(4):
        if(rand_str[i]==guess[i]):
            rabbit_count+=1
        elif(guess[i] in rand_str):
            tortoise_count+=1
    print("You got", rabbit_count,"Rabbit")
    print("You got", tortoise_count,"Tortoise")


rand_str= str(random.randint(0000,9999))
print("System generated 4 digit number is:", rand_str)
guess= input("Enter a 4digit number:")
if(len(guess)!=len(rand_str)):
    print("Invalid input")
elif(guess.isalpha()):
    print("Invalid input")
if(guess==rand_str):
    print("Winner")
    print("Do you want to continue?")
    ch= input()
    if(ch=='y'):
        compare_digit(rand_str,guess)
    elif(ch=='n'):
        exit()
    else:
        print("Invalid choice")

    



