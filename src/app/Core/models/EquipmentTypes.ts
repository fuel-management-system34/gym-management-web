export interface EquipmentType {
  Id: number;
  Name: string;
  Description?: string;
  Status: number;
  BranchId: number;
  CreatedOn: string;
  CreatedBy: number;
  ModifiedOn?: string;
  ModifiedBy?: number;
  IsDeleted: boolean;
}
