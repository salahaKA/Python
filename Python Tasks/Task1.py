import random

def digit_compare(rand_str,guess):
    
    rabbit_count=0
    tortoise_count=0
    for i in range(len(rand_str)):
        
        if(guess[i] == 
        rand_str[i]):
            rabbit_count+=1
        if((guess[i] in rand_str) and (rand_str[i]!= guess[i])):
            tortoise_count+=1

    print("Expected Output:")
    if(rabbit_count>=1):
        print("You got", rabbit_count, "rabbit")
    if(tortoise_count>=1):
        print("You got", tortoise_count, "tortoise")
    print("\n")

    
    if(len(rand_str)!=len(guess)):
        print("Invalid")
    if(guess.isalpha()):
        print("Invalid")
    if(guess==rand_str):
        print("WINNER")
        print("Do You Want To Continue?")
        ch= input()
        if(ch=='y'):
            rand_str= str(random.randint(1000,9999))
            print("system generated 4 digit number:", rand_str)
            guess= input("Enter a guess:")
            digit_compare(rand_str,guess)
        elif(ch=='n'):
            exit()
        else:
            print("Invalid choice")
    if(len(rand_str)!=len(guess)):
        print("Invalid")
    if(guess.isalpha()):
        print("Invalid")

    # rand_str= str(random.randint(1000,9999))
    # print("system generated 4 digit number:", rand_str)

    guess= input("Enter a guess:")
    digit_compare(rand_str,guess)


rand_str= str(random.randint(1000,9999))
print("system generated 4 digit number:", rand_str)
print("\n")

guess= input("Enter a guess:")

digit_compare(rand_str,guess)

