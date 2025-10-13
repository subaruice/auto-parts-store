import React, { useState } from "react";

type Order = {
    id: number;
    productID: { productID: number; quantity: number }[];
};

type User = {
    id: number;
    name: string;
    email: string;
    orders: Order[];
};

const sampleUsers: User[] = [
    {
        id: 1,
        name: "Иван Иванов",
        email: "ivan@mail.com",
        orders: [{ id: 1, productID: [{ productID: 1, quantity: 2 }] }],
    },
    {
        id: 2,
        name: "Пётр Петров",
        email: "petr@mail.com",
        orders: [],
    },
];

const Users: React.FC = () => {
    const [users] = useState<User[]>(sampleUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <div className="flex gap-4">
            <div className="w-60 border p-2">
                <h2 className="font-bold mb-2">Пользователи</h2>
                {users.map((u) => (
                    <div
                        key={u.id}
                        className={`p-2 cursor-pointer rounded ${selectedUser?.id === u.id ? "bg-blue-200" : ""}`}
                        onClick={() => setSelectedUser(u)}
                    >
                        {u.name}
                    </div>
                ))}
            </div>
            <div className="flex-1 p-2 border">
                {selectedUser ? (
                    <>
                        <h2 className="font-bold">{selectedUser.name} — Заказы</h2>
                        {selectedUser.orders.length === 0 ? (
                            <p>Нет заказов</p>
                        ) : (
                            selectedUser.orders.map((o) => (
                                <div key={o.id} className="p-2 border mb-2 rounded">
                                    <p>Номер заказа: {o.id}</p>
                                    {o.productID.map((p) => (
                                        <p key={p.productID}>
                                            Продукт {p.productID} — x{p.quantity}
                                        </p>
                                    ))}
                                </div>
                            ))
                        )}
                    </>
                ) : (
                    <p>Выберите пользователя</p>
                )}
            </div>
        </div>
    );
};

export default Users;
