
export const getMenuDetails = (details) => {
   
    var MenuList=JSON.parse(localStorage.getItem('MenuList'));
    
   if(details)
   {
    for(let i=0;i<details.length;i++)
    {
        for(let j=0;j<MenuList.length;j++)
        {
            if(details[i].name===MenuList[j].name)
            MenuList.splice(j,1,details[i])
        }
    }
   }

    
  localStorage.setItem('MenuList',JSON.stringify(MenuList))
    
         return {
        type: 'GET_MENU_DETAILS',
        payload: MenuList
    }
};
