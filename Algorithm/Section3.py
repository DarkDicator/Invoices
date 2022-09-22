def combination(t, min, max, l):    
    res = []  
    if l == 1 and t <= 9:
        res.append([t])  
    elif l == 0:
        return res    
    else:               
        for i in range(min, max, 1):            
            if i <= int(t / l):               
                Arrays = combination(t - i, i + 1, max, l - 1)                                      
                for j in range(0, len(Arrays), 1):
                    array = Arrays[j]
                    if i not in array:
                        array.insert(0, i)                    
                        res.append(array)
    return res   




if __name__ == "__main__":
    length = input("Input length of combination : ")
    total = input("Input total of combination: ")
    minvalue = 1
    maxValue = 9
    print(combination(int(total), minvalue, maxValue, int(length)))
