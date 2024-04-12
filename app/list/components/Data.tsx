"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { createClient } from "@/utils/supabase/client";

interface RowData {
  id: number;
  created_at: Date;
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
  members: any;
  org: string | undefined;
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

const convertCreatedAtToDate = (records: RowData[]): RowData[] => {
  return records.map((record) => ({
    ...record,
    created_at: new Date(record.created_at),
  }));
};

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    //要変更
    const now = new Date();
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        created_at: now,
        client: "顧客名",
        phone: "電話番号",
        person: "",
        status: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "client" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        顧客追加
      </Button>
    </GridToolbarContainer>
  );
}

export default function Data({ sales, members, org }: Props) {
  const supabase = createClient();
  const updatedRecords = convertCreatedAtToDate(sales);

  const initialRows: GridRowsProp = updatedRecords;
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    setRows(rows.filter((row) => row.id !== id));

    const { error } = await supabase.from("sales").delete().eq("id", id);
    if (error) {
      console.log("handleDeleteError:", error);
    }
  };

  const handlePhoneClick = React.useCallback((id: GridRowId) => {
    return () => {
      const item = updatedRecords.find((d) => d.id === id);
      if (item && item.phone) {
        navigator.clipboard
          .writeText(item.phone)
          .then(() => alert("電話番号をクリップボードにコピーしました。"))
          .catch((err) =>
            console.error("クリップボードへのコピーに失敗しました:", err)
          );
      } else {
        alert("電話番号が見つかりません。");
      }
    };
  }, []);

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    console.log(newRow);

    const isNewRow = isNaN(Number(newRow.id));

    if (isNewRow) {
      const { data, error } = await supabase
        .from("sales")
        .insert([
          {
            created_at: newRow.created_at,
            client: newRow.client,
            phone: newRow.phone,
            person: newRow.person,
            status: newRow.status,
            accept: false,
            list: null,
            email: org,
          },
        ])
        .select();
    } else {
      const { data, error } = await supabase
        .from("sales")
        .update({
          created_at: newRow.created_at,
          client: newRow.client,
          phone: newRow.phone,
          person: newRow.person,
          status: newRow.status,
        })
        .eq("id", newRow.id)
        .select();
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCellClick: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "日付",
      type: "date",
      width: 150,
      editable: true,
    },
    {
      field: "client",
      headerName: "顧客",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "phone",
      headerName: "電話番号",
      width: 180,
      editable: true,
    },
    {
      field: "person",
      headerName: "担当者",
      width: 150,
      type: "singleSelect",
      valueOptions: members,
      editable: true,
    },
    {
      field: "status",
      headerName: "状況",
      width: 150,
      type: "singleSelect",
      valueOptions: ["不在", "再架電", "アポ取得", "NG"],
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<PhoneIcon />}
            label="phone"
            onClick={handlePhoneClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onCellClick={handleCellClick}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
