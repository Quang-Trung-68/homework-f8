import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const EmployeeDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  curEmployee,
  employees,
  action,
  setEmployees,
}) => {
  let tempEmployee = { ...curEmployee };
  let tempEmployees = [];

  // validate input user

  function validateUser({ name, age, address }) {
    const errors = [];

    // Validate name
    if (typeof name !== "string") {
      errors.push("Name must be a string.");
    } else {
      const trimmedName = name.trim();
      if (!trimmedName) {
        errors.push("Name is required and cannot be empty or whitespace only.");
      } else if (trimmedName.length < 2) {
        errors.push("Name must be at least 2 characters long.");
      } else if (trimmedName.length > 50) {
        errors.push("Name cannot exceed 50 characters.");
      } else if (!/^[\p{L}\s'-]+$/u.test(trimmedName)) {
        errors.push(
          "Name can only contain letters, spaces, hyphens, and apostrophes."
        );
      }
    }

    // Validate age
    if (typeof age !== "number") {
      errors.push("Age must be a number.");
    } else if (!Number.isInteger(age)) {
      errors.push("Age must be a whole number.");
    } else if (age < 1) {
      errors.push("Age must be at least 1.");
    } else if (age > 150) {
      errors.push("Age cannot exceed 150.");
    }

    // Validate address
    if (typeof address !== "string") {
      errors.push("Address must be a string.");
    } else {
      const trimmedAddress = address.trim();
      if (!trimmedAddress) {
        errors.push(
          "Address is required and cannot be empty or whitespace only."
        );
      } else if (trimmedAddress.length < 5) {
        errors.push("Address must be at least 5 characters long.");
      } else if (trimmedAddress.length > 200) {
        errors.push("Address cannot exceed 200 characters.");
      } else if (!/^[\p{L}\p{N}\s,.'#/-]+$/u.test(trimmedAddress)) {
        errors.push("Address contains invalid characters.");
      }
    }

    return errors.length > 0 ? errors.join(" ") : null;
  }
  const handleEdit = (tempEmployee, curEmployee) => {
    if (!validateUser(tempEmployee)) {
      curEmployee.name = tempEmployee.name;
      curEmployee.age = tempEmployee.age;
      curEmployee.address = tempEmployee.address;
      toast("Edited " + tempEmployee.name);
      setIsOpenDialog(false);
    }
    if (validateUser(tempEmployee)) toast.error(validateUser(tempEmployee));

    console.log(employees);
  };

  const handleDelete = (curEmployee) => {
    tempEmployees = [...employees];
    tempEmployees = tempEmployees.filter((elp) => elp.id != curEmployee.id);
    setEmployees(tempEmployees);
    toast.warning("Deleted " + tempEmployee.name);
    setIsOpenDialog(false);

    console.log(employees);
  };

  const handleAdd = (tempEmployee) => {
    if (!validateUser(tempEmployee)) {
      tempEmployee.id = uuidv4();
      setEmployees([...employees, tempEmployee]);
      toast.info("Added " + tempEmployee.name);
      setIsOpenDialog(false);
    }
    if (validateUser(tempEmployee)) toast.error(validateUser(tempEmployee));

    console.log(employees);
  };

  return (
    <>
      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {action == "edit"
              ? "Edit "
              : action == "delete"
              ? "Delete "
              : "Add New "}
            Employee
          </span>
          <CloseOutlinedIcon
            onClick={() => {
              setIsOpenDialog(false);
            }}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            disabled={action == "delete"}
            fullWidth
            label="Name"
            variant="standard"
            defaultValue={curEmployee.name}
            onChange={(e) => {
              tempEmployee.name = e.target.value.trim();
            }}
          />
          <TextField
            disabled={action == "delete"}
            fullWidth
            label="Age"
            variant="standard"
            defaultValue={curEmployee.age}
            onChange={(e) => {
              tempEmployee.age = Number(e.target.value.trim());
            }}
          />
          <TextField
            disabled={action == "delete"}
            fullWidth
            label="Address"
            variant="standard"
            defaultValue={curEmployee.address}
            onChange={(e) => {
              tempEmployee.address = e.target.value.trim();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color={"error"}
            variant={"outlined"}
            onClick={() => {
              setIsOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color={"info"}
            variant={"outlined"}
            onClick={() => {
              action == "edit"
                ? handleEdit(tempEmployee, curEmployee)
                : action == "delete"
                ? handleDelete(curEmployee)
                : handleAdd(tempEmployee);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EmployeeDialog;
