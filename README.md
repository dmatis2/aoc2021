# Advent of Code 2021
Author: *Dominik Matis*

## Day 1
- start from second item, filter those with higher value than previous and print length
- map values to triples sum and reuse same function as part 1

## Day 2
- map values to directions and fold all values to get result position
- maintain `aim` value and use it for `forward` command

## Day 3
- get counts for every column, map them to 0 or 1, get value and inverted value, parse them to integer and make a product
- reuse `getRating` function

## Day 4
- play until bingo, sum not selected values and multiply by number called
- invert playing, first first not winning

## Day 5
- use `Map` to store number of intersections on specific points
- use `Map` to store number of intersections on specific points while allowing diagonals

## Day 6
- use `Map` to store number of lanterfish that have the same day, each day, move map keys around and add day 8 lanternfishes
- reuse the same function `getNumberAfterNDays` since it's efficient for 256 days

## Day 7
- loop from `min` to `max` inclusive and find the lowest cost by absolute value
- reuse the same function but calculate distance by sum of natural numbers formula `n * (n+1) / 2`

## Day 8
- use `Map` to store count of digits 1,4,7,8 and return its sum of values
- get strings for known numbers (1,4,7,8), group others by number of segments, use the fact that number 9 consists of number 4, 0 of 1, 6 otherwise and 3 consists of 1, for 5 and 2 invert the use of number 9, as 5 does not match with 9 only in 1 segment, 2 otherwise

## Day 9
- go through each number in array and count the number of values that are lowest
- use `BFS` algo to go through lowest values and find higher values except `9` (using `queue` and marking visited values), sort sums, return product of 3 largest numbers

## Day 10
- use stack to store opening brackets and pop stack when correct closing bracket shows
- when line is not corrupted and stack is not empty, pop stack and calculate scores, sort it and print the middle one

## Day 11
- use recursive strategy to flash all needed
- infinite loop and stop on correct day

## Day 12
- use adjacency matrix in the form of `Map` and interative version of BFS for graph traversal with storing current state and visited in object
- add property to state to keep track of number of visits (simple boolean) - **takes more than 2 minutes to solve**

## Day 13
- keep track of all points, calculate new position by subtracting double the distance between the point and the folding point, remove duplicates using `Set`
- reuse `fold` function for all instructions, print all remaining points into the grid and revert axes to get the code

## Day 14
- direct insertion into the string, use `Map` to count letter occurences
- use `Map` to track pairs, get letters count, divide min and max by 2 and floor down

## Day 15
- **SOLVING IN PYTHON**
- using Dijkstra algorithm with `queue.PriorityQueue`
- use modulo and integer division to get tile position

## Day 16
- keep track of current position in input, parse hex to binary or decimal as needed
- implement instructions