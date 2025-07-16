import { prisma } from '../../../db';
import { TableStatus, TableSize } from '../../../../prisma/generated/prisma';

export const TableSeed = async () => {
  const tables = [
    // Floor 1
    { number: 'A1', status: TableStatus.AVAILABLE, size: TableSize.SMALL, floor: 1 },
    { number: 'A2', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 1 },
    { number: 'A3', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 1 },
    { number: 'A4', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 1 },
    { number: 'A5', status: TableStatus.AVAILABLE, size: TableSize.SMALL, floor: 1 },
    { number: 'A6', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 1 },
    // Floor 2
    { number: 'B1', status: TableStatus.AVAILABLE, size: TableSize.SMALL, floor: 2 },
    { number: 'B2', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 2 },
    { number: 'B3', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 2 },
    // Floor 3
    { number: 'C1', status: TableStatus.AVAILABLE, size: TableSize.SMALL, floor: 3 },
    { number: 'C2', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 3 },
    { number: 'C3', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 3 },
  ];
  await prisma.table.deleteMany();
  console.log('Deleted all tables successfully!');
  await prisma.table.createMany({
    data: tables,
  });

  console.log('Seeded 12 tables successfully!');
};
