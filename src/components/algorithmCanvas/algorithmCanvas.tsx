import "./algorithmCanvas.css"
import { useEffect, useRef } from "react"
import type { HexNode } from "../../types/graph";

function createHexGrid(
    width:number,
    height:number,
    radius:number
): HexNode[] {

    const nodes: HexNode[] = [];

    const horizontalSpacing = radius * 1.5;
    const verticalSpacing = Math.sqrt(3) * radius;

    const columns = Math.ceil(width / horizontalSpacing);
    const rows = Math.ceil(height / verticalSpacing);


    let id = 0;


    for(let col = 0; col < columns; col++){

        for(let row = 0; row < rows; row++){

            const x = col * horizontalSpacing;

            let y = row * verticalSpacing;


            if(col % 2 === 1){

                y += verticalSpacing / 2

            }


            nodes.push({

                id:id,
                row:row,
                col:col,

                x:x,

                y:y,

                neighbors: []

            });


            id++;

        }

    }


    return nodes;

}

function connectNeighbors(nodes: HexNode[]) {

    const nodeMap = new Map<string, HexNode>();

    nodes.forEach((node) => {
        nodeMap.set(
            `${node.row},${node.col}`,
            node
        );
    });


    nodes.forEach((node) => {

        const evenColumnDirections = [
            [-1, 0],
            [1, 0],
            [-1, -1],
            [0, -1],
            [-1, 1],
            [0, 1]
        ];


        const oddColumnDirections = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [1, -1],
            [0, 1],
            [1, 1]
        ];


        const directions =
            node.col % 2 === 0
                ? evenColumnDirections
                : oddColumnDirections;


        directions.forEach(([rowOffset, colOffset]) => {

            const neighborRow =
                node.row + rowOffset;

            const neighborCol =
                node.col + colOffset;


            const neighbor =
                nodeMap.get(
                    `${neighborRow},${neighborCol}`
                );


            if (neighbor) {

                node.neighbors.push(
                    neighbor.id
                );

            }

        });

    });

}

function drawHexagon(
    context: CanvasRenderingContext2D,
    x:number,
    y:number,
    radius:number
){
    context.beginPath();

    for(let i=0; i < 6; i++){
        const angle = (Math.PI / 3) * i

        const pointX = x + radius * Math.cos(angle)
        const pointY = y + radius * Math.sin(angle)

        if(i==0){
            context.moveTo(pointX, pointY)
        } else {
            context.lineTo(pointX, pointY)
        }
    }

    context.closePath();
    context.stroke();
}

function drawNodeId(context: CanvasRenderingContext2D, node: HexNode){
    context.fillStyle = "white";

    context.font = "10px Arial";

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(
        node.id.toString(),
        node.x,
        node.y
    );

    
}

function AlgorithmCanvas (){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas) return;


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const context = canvas.getContext("2d");

        if(!context) return;


        context.fillStyle = "black";

        context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        context.strokeStyle = "white";

        const radius = 30;

        const nodes = createHexGrid(canvas.width, canvas.height, radius);
        connectNeighbors(nodes);

        console.log(nodes[50]);

        nodes.forEach((node)=>{
            drawHexagon(context, node.x, node.y, radius);

            drawNodeId(context, node);
        })


    }, []);

    return (

        <canvas 
           ref={canvasRef}
           className="algorithm-canvas"
        />
    )
}

export default AlgorithmCanvas