const sharp = require("sharp")
const getImages = async () => {
const svgWidth = 100; 
const svgHeight = 100;

const serial = 2340;// Serial number (position)
    
const serial_max = 10000 //Max value of serial Number
    
const NFT_Size = 4096;
const particle_size = Math.floor(NFT_Size / 100) //Size in pixels of each particle
    
const X = serial === serial_max ? 100 :  serial % svgWidth; //X position based on serial number and svg width 
const Y = ~~(serial / svgHeight); //Y position based on serial number and svg height
    
const coordinateSVG = `
<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
<line x1="${X}" y1="0" x2="${X}" y2="${svgHeight}" stroke="#00F0FF"  stroke-opacity="1" shape-rendering="cripsEdges"/>
<line x1="0" y1="${Y}" x2="${svgWidth}" y2="${Y}" stroke="#00F0FF"  stroke-opacity="1" shape-rendering="cripsEdges"/>
</svg>`
    await sharp(Buffer.from(coordinateSVG)).resize(NFT_Size).composite([{ input: 'NFT.png', blend: 'overlay' }]).toFile('NFT_coords.png', (err, info) => { console.log(err,info) });
    await sharp('NFT.png').extract({
        /** zero-indexed offset from left edge */
        left: Math.floor((X*NFT_Size/100)-particle_size),
        /** zero-indexed offset from top edge */
        top: Math.floor((Y*NFT_Size/100)-particle_size),
        /** dimension of extracted image */
        width: Math.floor(particle_size),
        /** dimension of extracted image */
        height: Math.floor(particle_size),
    }).toFile('extracted.png', (err, info) => { console.log(err,info) });
}

getImages()