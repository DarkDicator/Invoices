def combination(t, l, nums):      
    res = []
    if l == 1 and t <= 9:
        res.append([t])
    elif l == 0:
        return res
    else:
        for i in nums:            
            nums = [1,2,3,4,5,6,7,8,9]
            if i <= int(t / l):
                nums.pop(0)
                array = combination(t - i, l - 1, nums)
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
    nums = [1,2,3,4,5,6,7,8,9]
    print(combination(int(total), int(length), nums))
