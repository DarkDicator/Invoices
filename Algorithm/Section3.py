def combination(t, l):    
    nums = [1,2,3,4,5,6,7,8,9]  
    res = []
    if l == 1 and t <= 9:
        res.append([t])
    elif l == 0:
        return res
    else:
        for i in nums:                    
            if i <= int(t / l):                
                array = combination(t - i, l - 1)
                for n in array:
                    currentArr = n
                    if i not in currentArr:
                        currentArr.insert(0, i)
                        currentArr.sort()
                        if currentArr not in res:                            
                            res.append(currentArr)            
    return res




if __name__ == "__main__":
    length = input("Input length of combination : ")
    total = input("Input total of combination: ")    
    print(combination(int(total), int(length)))
