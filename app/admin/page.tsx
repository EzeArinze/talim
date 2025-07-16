import { ChartAreaInteractive } from "@/components/admin-dashboard/chart-area-interactive";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { SectionCards } from "@/components/admin-dashboard/section-cards";

import data from "./data.json";

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
