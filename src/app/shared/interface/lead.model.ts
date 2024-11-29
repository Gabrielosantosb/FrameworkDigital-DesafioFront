export interface LeadModel{
   leadId : number;
   contactFirstName : string;
   contactLastName : string;
   contactEmail : string;
   contactPhoneNumber : string;
   dateCreated: Date;
   suburb: string;
   category: string;
   description: string;
   price: string;
   status: string;
}
/*sing FrameworkDigital_DesafioBackEnd.ORM.Enum;
using System.ComponentModel.DataAnnotations;

namespace FrameworkDigital_DesafioBackEnd.ORM.Entity.Lead
{
  public class LeadModel
  {
    [Key]
    public int LeadId { get; set; }
public string ContactFirstName { get; set; }
public string ContactLastName { get; set; }
public string ContactEmail { get; set; }
public string ContactPhoneNumber { get; set; }
public DateTime DateCreated { get; set; }
public string Suburb { get; set; }
public string Category { get; set; }
public string Description { get; set; }
public decimal Price { get; set; }
public LeadStatusEnum Status { get; set; }



}
}*/
