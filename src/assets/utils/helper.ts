/* First Solution - Not Work */
// /* Handle All Images paths By using import.meta.glob("path", {eager: true}) to get image as module object */
/* How Import images as Module 
    1- To import specific image => import image from 'imagePath'
    2- To import all images folder at once time => using import.meta.glob("image folder path", {eager: true}) 
        // using {eager: true} to explicit do not return promise
        const imagesModule = import.meta.glob('../images/*.*', {eager: true}); => is return image as module of object
        const imagesArray: string[] = Object.values(imagesModule).map(imgModule => imgModule.default); => return image from datatype of default (string)
*/
// const imageModules = import.meta.glob<{default: string}>("../images/*.*", {eager: true})
// const imagesArray: string [] = Object.values(imageModules).map(imgModule => imgModule.default)


// export default function handleImage(imgname: string):string {
//     return imagesArray.filter(img => img.includes(imgname)).join('');
// }


/* The Second Solution is Smart and More Performance but not works - Not Work */
// // using only import.meta.glob to get all image sources => this features not related but related only to vite build tool and astro
// // imageModules return object with allImagePath with domainName (domainName/src/assets/images/imageName.png) as key and allImagePath without domainName (assets/images/imageName.png) as value
// const imageModules = import.meta.glob("@/assets/images/*.*", {eager: true, as: 'url'});

// // Create New Map to make more performance to achieve O Big (1) => O(1)
// // if use array must loop foreach element to get the same image name => O Big (n) => O(n)
// // but by using Map you can access the same image in one step map.get(key) => O(1)
// const imagesMap = new Map<string, string>();
// console.log(imagesMap)
// console.log(imageModules)

// // using Object.entries to get both key and value which one with domainName and other without domainName
// // ([img, path]) => destructure key and value from imageModules as array
// Object.entries(imageModules).forEach(([img, path]) => {
//     // get Only image Name as key by using split('/').pop() return array then pop() is delete last element and return last element
//     const imageName = img.split('/').pop()!;
//     // Set imageName as key and imagePath as value
//     imagesMap.set(imageName, path as string);
// });


// // All Above Codes if set inside function in each image need to get imageUrl we will create function from scratch which means until use Map will return to O Big (n) O(n)
// export default function getImageUrl(imageName: string): string {
//     // if imageName exist inside map return associated value inside map otherwise return undefined
//     const imageUrl = imagesMap.get(imageName);
//     console.log(`imageName ${imageName}`);
//     console.log(`image not found ${imageUrl}`);
//     if(!imageUrl) {
//         console.log(`image not found ${imageUrl}`);
//         return '';
//     }

//     return imageUrl;
// }

// // then add this manually inside file vite.config.ts
// // resolve: {
// //     alias: {'@': path.resolve(__dirname, 'src')},
// //   },

/* This is The Best Practice Solution To Get Image */
/* Third Solution is best depend on import.meta.url not import.meta.glob */
export default function getImage(imageName: string): string {
    try {
        const imageUrl = new URL(`../images/${imageName}`, import.meta.url).href;
        return imageUrl;
    } catch (error) {
        console.log(`Image Not Found ${imageName} and error is ${error}`);
        return '';
    }
}