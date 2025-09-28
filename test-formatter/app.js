const { compressMultipleImages, formatFileSize } = require('@martindev237/file-size-formatter');
const fs=require('fs');
console.log(formatFileSize(123456789, 1)); 

async function main(){
    const buffers=await compressMultipleImages(['assets/img1.jpg','assets/img2.jpg'],{maxWidth:800})

    buffers.forEach((buffer,index)=>{
        fs.writeFileSync(`./compressed-image${index+1}.jpg`,buffer)
        console.log(`Taille de l'image compressée ${index+1} : ${formatFileSize(buffer.length)}`)
    })
}

main()

