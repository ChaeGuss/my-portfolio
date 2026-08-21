import "./algorithmCanvas.css"
import { useEffect, useRef } from "react"

function createHexGrid(
    width:number,
    height:number,
    radius:number
){

    const nodes = [];

    const hexHeight = Math.sqrt(3) * radius;
    const horizontalSpacing = radius * 1.5;


    let id = 0;


    for(
        let row = 0;
        row * hexHeight < height + hexHeight;
        row++
    ){

        for(
            let col = 0;
            col * horizontalSpacing < width + radius;
            col++
        ){

            let offset = 0;


            if(row % 2 === 1){

                offset = radius * 0.75;

            }


            nodes.push({

                id:id,

                x:
                col * horizontalSpacing + offset,

                y:
                row * hexHeight

            });


            id++;

        }

    }


    return nodes;

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

        const nodes = createHexGrid(canvas.width, canvas.height, 30);

        nodes.forEach((node)=>{
            drawHexagon(context, node.x, node.y, 30);
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