import { useContext } from 'react';
import { View, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { ExpensesContext } from '../context/ExpensesContext';
import { getDateMinusDays } from '../utils/fomateDate';

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((item) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return item.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput expensesPeriod='Last 7 days' expenses={recentExpenses} />
  );
};

export default RecentExpenses;
