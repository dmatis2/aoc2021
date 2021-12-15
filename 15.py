from queue import PriorityQueue

def get_value(x, y, part2):
    global data
    orig = len(data)
    if not part2:
        return data[y % orig][x % orig]
    return ((data[y % orig][x % orig] + x // orig + y // orig - 1) % 9) + 1

f = open('input.txt', 'r')
data = [[int(ch) for ch in w] for w in f.read().split('\n')]

def dijkstra(part2 = False):
    global data
    length = len(data) * 5 if part2 else len(data)
    visited = set()
    distances = [[float('inf')] * length for x in range(length)]
    distances[0][0] = 0

    queue = PriorityQueue()
    queue.put((0, (0, 0)))

    while not queue.empty():
        (distance, position) = queue.get()
        visited.add(position)
        x = position[0]
        y = position[1]
        for dx, dy in [[-1, 0], [0, -1], [0, 1], [1, 0]]:
            x1 = position[0] + dx
            y1 = position[1] + dy
            if x1 < 0 or x1 >= length:
                continue
            if y1 < 0 or y1 >= length:
                continue
            if (x1, y1) in visited:
                continue
            new_distance = distances[y][x] + get_value(x1, y1, part2)
            if new_distance < distances[y1][x1]:
                distances[y1][x1] = new_distance
                queue.put((new_distance, (x1, y1)))
    print(distances[length - 1][length - 1])

dijkstra()
dijkstra(True)