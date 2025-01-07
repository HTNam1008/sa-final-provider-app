import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton } from '@mui/material';
import { Payment } from '../types';

interface PaymentTableProps {
  payments: Payment[];
  onDelete: (id: string) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Campaign</TableCell>
            <TableCell>Total Fee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <TableSortLabel>Date</TableSortLabel>
            </TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.campaign}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>{payment.totalFee}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(payment.id)}>
                  🗑️
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;