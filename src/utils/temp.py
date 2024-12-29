import json

f = open('animals.txt', "r")

list = []

for line in f:
    line = line.replace('\n', '')
    list.append(line)
    
json_str = json.dumps(list)
print(json_str)