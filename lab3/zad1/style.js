function ustaw(mode){
    if(x.matches){
        for(i=0; i < aside_tag.length; i++){
            aside_tag[i].style.float = mode == 'on' ?'none': '';
            aside_tag[i].style.marginLeft =  mode == 'on' ? '25px': '';
            aside_tag[i].style.marginRight =  mode == 'on' ? '25px': '';
            aside_tag[i].style.width =  mode == 'on' ? 'auto': '';
        }
        asideh1_tag.style.animation =  mode == 'on' ? "colorchange 3s infinite alternate": '';
        main_tag[0].style.clear =  mode == 'on' ? 'left': '';
        main_tag[0].style.width =  mode == 'on' ? 'auto': '';
        main_tag[0].style.float =  mode == 'on' ? 'none': '';
        for(i=0; i < nav_tag.length; i++){
            nav_tag[i].style.width =  mode == 'on' ? 'auto': '';
            nav_tag[i].style.float =  mode == 'on' ? 'none': '';
        }
        for(i=0; i < block_tag.length; i++){
            block_tag[i].style.margin =  mode == 'on' ? '0': '';
        }
        for(i=0; i < azure_class.length; i++){
            azure_class[i].style.backgroundColor =  mode == 'on' ? ' #EFF': '';
            azure_class[i].style.border =  mode == 'on' ? ' #A8A8A8': '';
            azure_class[i].style.margin =  mode == 'on' ? ' 5px': '';
            azure_class[i].style.padding =  mode == 'on' ? ' 8px': '';
            azure_class[i].style.boxShadow=  mode == 'on' ? ' 0px 1px 8px -1px': '';
            azure_class[i].style.fontSize =  mode == 'on' ? ' 2vw': '';
        }  
    }
    else{
        for(i=0; i < aside_tag.length; i++){
            aside_tag[i].style.float = mode == 'on' ?'right': '';
            aside_tag[i].style.marginLeft =  mode == 'on' ? '25px': '';
            aside_tag[i].style.marginRight =  mode == 'on' ? '25px': '';
            aside_tag[i].style.width =  mode == 'on' ? '50%': '';
        }
        asideh1_tag.style.animation =  mode == 'on' ? "colorchange 3s infinite alternate": '';
        main_tag[0].style.clear =  mode == 'on' ? 'left': '';
        main_tag[0].style.width =  mode == 'on' ? '35%': '';
        for(i=0; i < nav_tag.length; i++){
            nav_tag[i].style.width =  mode == 'on' ? 'fit-content': '';
            nav_tag[i].style.float =  mode == 'on' ? 'left': '';
        }
        for(i=0; i < block_tag.length; i++){
            block_tag[i].style.margin =  mode == 'on' ? '0': '';
        }
        for(i=0; i < azure_class.length; i++){
            azure_class[i].style.backgroundColor =  mode == 'on' ? ' #EFF': '';
            azure_class[i].style.border =  mode == 'on' ? ' #A8A8A8': '';
            azure_class[i].style.margin =  mode == 'on' ? ' 5px': '';
            azure_class[i].style.padding =  mode == 'on' ? ' 8px': '';
            azure_class[i].style.boxShadow=  mode == 'on' ? ' 0px 1px 8px -1px': '';
        }  
    }
}
const aside_tag = document.getElementsByTagName('aside')
const asideh1_tag = document.getElementById('to_animate');
const main_tag = document.getElementsByTagName('main');
const nav_tag = document.getElementsByTagName('nav');
const block_tag = document.getElementsByTagName('blockquote');
const azure_class = document.getElementsByClassName('azure');
var x = window.matchMedia("(max-width: 700px)");