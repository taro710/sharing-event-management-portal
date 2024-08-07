import { ExpenseData } from '@/domain/expense';

export const sample = (expenses: ExpenseData[]) => {
  const paidMemberNames = new Set(expenses.map((expense) => expense.payerName));

  // {paidMemberName:負担した人. totalPaidFee:その人のトータルの負担額}
  const paidMemberNameAndTotalPaidFeeList = Array.from(paidMemberNames).map(
    (paidMemberName) => {
      const totalPaidFee = expenses
        .filter((expense) => expense.payerName === paidMemberName)
        .reduce((acc, cur) => acc + cur.price, 0);
      return { paidMemberName, totalPaidFee };
    },
  );

  return paidMemberNameAndTotalPaidFeeList;
};

export const sample2 = (expenses: ExpenseData[], participants: string[]) => {
  const participantAndTotalFeeList = participants.map((participant) => {
    const expenseList = expenses.filter((expense) =>
      expense.members.includes(participant),
    );

    const totalFee = expenseList.reduce(
      (acc, cur) => acc + cur.price / cur.members.length,
      0,
    );

    return { participant, totalFee };
  });
  return participantAndTotalFeeList;
};

export const sample3 = (
  paidMemberNameAndTotalPaidFeeList: {
    paidMemberName: string;
    totalPaidFee: number;
  }[],
  participantAndTotalFeeList: {
    participant: string;
    totalFee: number;
  }[],
) => {
  const participantAndPayBalanceList = participantAndTotalFeeList.map(
    ({ participant, totalFee }) => {
      const paidTotalFee =
        paidMemberNameAndTotalPaidFeeList.find(
          ({ paidMemberName }) => paidMemberName === participant,
        )?.totalPaidFee || 0;

      const balance = totalFee - paidTotalFee;

      return { participant, balance };
    },
  );
  return participantAndPayBalanceList;
};

export const func = (expenses: ExpenseData[], participants: string[]) => {
  // {paidMemberName:負担した人. totalPaidFee:その人のトータルの負担額}
  const paidMemberNameAndTotalPaidFeeList = sample(expenses);

  // {participant:参加者. totalFee: このイベントではらわないといけない実質額}
  const participantAndTotalFeeList = sample2(expenses, participants);

  // {participant:参加者. balance: 貸し借りの額}
  const participantAndPayBalanceList = sample3(
    paidMemberNameAndTotalPaidFeeList,
    participantAndTotalFeeList,
  ).map((res) => {
    return { ...res, balance: Math.round(res.balance) }; // TODO: !roundかtruncか
  });

  const 誤差 = participantAndPayBalanceList.reduce(
    (acc, cur) => acc + cur.balance,
    0,
  );

  const もらう人 = structuredClone(participantAndPayBalanceList) // TODO: 解除可能
    .filter((man) => man.balance < 0)
    .sort((a, b) => a.balance - b.balance)
    .map((man, i) => {
      return { ...man, balance: i === 0 ? man.balance - 誤差 : man.balance };
    });
  const 払う人 = structuredClone(participantAndPayBalanceList) // TODO: 解除可能
    .filter((man) => man.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  // もらう人と払う人の貸し借りの総和が0になることを確認 TODO:

  let i = 0; // Answerを関数化して、中に入れる // TODO:
  const answer = 払う人.map((man) => {
    const to = [];

    // console.warn(`${man.participant}が誰にいくら払うか計算開始`);

    let 貸し借り = man.balance;

    // TODO:
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const もらう人の現在の貸し借り = もらう人[i].balance;

      if (貸し借り + もらう人の現在の貸し借り > 0) {
        to.push({
          participant: もらう人[i].participant,
          price: -もらう人の現在の貸し借り,
        });
        // 余力がまだあるので次の人にも支払い
        貸し借り += もらう人の現在の貸し借り;
        i += 1;
      } else {
        // 全部余力を使ったのでこのmanは支払い完了
        to.push({
          participant: もらう人[i].participant,
          price: 貸し借り,
        });
        もらう人[i].balance += 貸し借り;

        return {
          participant: man.participant,
          //   Diff: man.balance,
          to,
        };
      }
    }
  });

  return answer;
};
