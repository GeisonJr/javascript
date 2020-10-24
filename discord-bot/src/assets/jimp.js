const jimp = require("jimp");

async function main() {
    let source = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read("images/mask/mascara.png");
    //let avatar = await jimp.read("images/logo/img.png");
    let background = await jimp.read("images/background/background2.png");

    jimp.read("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9sDySFZ6MnDwZktj7HVxDgij-chh_UEng84bFyAhejV9sAvWxw")
    .then(avatar => {
        mask.resize(130, 130);

        avatar.resize(130, 130);
        avatar.mask(mask);
    
        background.print(source, 170, 175, "texto");
        background.composite(avatar, 40, 90).write("images/welcome.png");
    })
    .catch(err => {
        console.log("ERROR: could not find the image");
    });
    
};
main()