const { compressMultipleImages,compressImage, formatFileSize } = require('@martindev237/file-size-formatter');
const fs=require('fs');
console.log(formatFileSize(123456789, 1)); 

async function main(){
    try {
        const buffers=await compressMultipleImages(['assets/imgs1.jpg','assets/img2.jpg'],{maxWidth:800})

        buffers.forEach((buffer,index)=>{
            fs.writeFileSync(`./compressed-image${index+1}.jpg`,buffer)
            console.log(`Taille de l'image compressée ${index+1} : ${formatFileSize(buffer.length)}`)
        })
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

async function compress() {
    const buffer = await compressImage('assets/imgs1.jpg', { maxWidth: 600, quality: 0.7 });
    fs.writeFileSync('./output.jpg', buffer);
    console.log(`Taille compressée : ${formatFileSize(buffer.length)}`);
  }

main()

