import EquipmentTable from "@/components/equipment/details/equipmentTable";

export default function Page() {
  return (
    // <div className="container mx-auto p-6">
    //   {/* Header Section */}
    //   <div className="flex justify-between items-center mb-6">
    //     <h1 className="text-2xl font-bold">Equipment Details</h1>
    //     <AddButton/>
    //   </div>

    //   {/* Equipment Table */}
    //   <EquipmentTable />
    // </div>
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Equipment Management</h1>
      <EquipmentTable />
    </div>
  );
}
