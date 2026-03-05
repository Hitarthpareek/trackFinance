import React from "react";
import { Line, Pie } from "@ant-design/charts";

const ChartsComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  let spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;

    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }

    return acc;
  }, {});

  console.log(Object.values(finalSpendings));

  const config = {
    data: data,
    width: 800,
    autoFit: false,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 800,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div>
      <div className="charts-wrapper">
        <div>
          <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
          <Line {...config} />
        </div>

        <div>
          <h2>Your Spending</h2>
          <Pie {...spendingConfig} />
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;
