import type { HexNode } from "../types/graph";

export interface BFSResult {
    visitedOrder: number[];
    path: number[];
}

export function bfs(nodes: HexNode[], startId: number, goalId: number): BFSResult {

    const queue: number[] = [startId];

    const visited = new Set<number>();

    const cameFrom = new Map<number, number>();

    const visitedOrder: number[] = [];

    visited.add(startId);

    while (queue.length > 0) {
        const currentId = queue.shift();

        if (currentId === undefined){
            break;
        }

        visitedOrder.push(currentId);

        if (currentId === goalId){
            break;
        }

        const currentNode = nodes[currentId];

        for (const neighborId of currentNode.neighbors){

            if(!visited.has(neighborId)){
                visited.add(neighborId);
                queue.push(neighborId);

                cameFrom.set(neighborId, currentId);
            }
        }


    }

    const path: number[] = [];

    if (visited.has(goalId)){

        let current = goalId;

        path.push(current);

        while(current !== startId){

            const previous = cameFrom.get(current);

            if(previous === undefined){
                break;
            }

            current = previous;

            path.push(current);
        }

        path.reverse();
    }

    return {visitedOrder, path};
}