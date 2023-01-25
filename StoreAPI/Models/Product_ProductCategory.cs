// include necesary using statements
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace StoreAPI.Models
    
{
    public class Product_ProductCategory
    {
        // ID, Name, Image, Description, Price, ProductCategoryName
        public int ID { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductCategoryName { get; set; }
       
    }
}
