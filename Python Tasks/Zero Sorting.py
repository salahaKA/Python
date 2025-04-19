
num_str = input("Enter numbers seperated by commas:")

while " " in num_str:
    print("Invalid Input, please enter items seperated by commas:")
    num_str = input("")
else:
    num_list = num_str.split(",")
    print(type(num_list))

for i in range (len(num_list)):
    num_list[i] = int(num_list[i])

def move_back(num_list, i, temp):
    num_list.remove(num_list[i])
    num_list.append(temp)

temp = 0
for i in range(0,len(num_list)-1):
    if num_list[i] == 0:
        temp = num_list[i]
        move_back(num_list, i, temp)
print(num_list)