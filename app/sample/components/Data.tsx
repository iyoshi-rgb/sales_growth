import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridValidRowModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";

interface RowData {
  id: number;
  created_at: string;
  client: string;
  phone: string | null;
  person: string;
  status: string | null;
  accept: boolean;
  email: string;
  list: string | null;
}

interface Props {
  sales: RowData[];
}

const columns: GridColDef[] = [
  { field: "created_at", headerName: "作成日", width: 150, editable: true },
  { field: "client", headerName: "クライアント", width: 200, editable: true },
  { field: "phone", headerName: "電話番号", width: 150, editable: true },
  { field: "person", headerName: "担当者", width: 130, editable: true },
  { field: "status", headerName: "ステータス", width: 120, editable: true },
  { field: "accept", headerName: "承認", width: 100, editable: true },
  { field: "list", headerName: "リスト", width: 150, editable: true },
];

const Data: React.FC<Props> = ({ sales }) => {
  const DB = async (newRow: GridRowModel) => {
    // ここで更新処理を実装（この例ではダミーの実装を示しています）
    console.log("Update row:", newRow);
    return newRow;
  };

  return (
    <div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={sales}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Data;
