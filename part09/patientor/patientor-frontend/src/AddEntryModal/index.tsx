import React from "react";
import { Alert } from "@material-ui/lab";
import AddEntryForm from "./AddEntryForm";
import { NewEntry } from "../types";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewEntry) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
  
  export default AddEntryModal;