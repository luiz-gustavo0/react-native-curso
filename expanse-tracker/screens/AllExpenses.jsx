import { useContext } from 'react';
import { View, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { ExpensesContext } from '../context/ExpensesContext';

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  return <ExpensesOutput expensesPeriod='Total' expenses={expenses} />;
};

export default AllExpenses;
