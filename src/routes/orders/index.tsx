import HeaderTitle from "@/components/goBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetOrdersQuery } from "@/features/order/orderQuery";
import { useState } from "react";

import { format } from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // or your custom popover
import { CalendarDays } from "lucide-react";

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const matchesSearch = order.items.some((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    const withinDateRange =
      (!startDate || new Date(startDate) <= orderDate) &&
      (!endDate || new Date(endDate) >= orderDate);
    const matchesStatus = !status || order.status === status;
    return matchesSearch && withinDateRange && matchesStatus;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-8">Failed to load orders.</p>
    );
  }

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-500">Loading orders...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <HeaderTitle title="My Orders" />

      <div className="relative w-full mt-3">
        <Input
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm border border-gray-300 rounded-full"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center mt-5">
        {/* Start Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 w-full md:w-1/4 text-left border rounded-full px-4 py-2 text-sm bg-white">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              {startDate ? format(startDate, "PPP") : "Start Date"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <DayPicker
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              captionLayout="dropdown"
              fromYear={2020}
              toYear={2030}
            />
          </PopoverContent>
        </Popover>

        {/* End Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 w-full md:w-1/4 text-left border rounded-full px-4 py-2 text-sm bg-white">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              {endDate ? format(endDate, "PPP") : "End Date"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <DayPicker
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              captionLayout="dropdown"
              fromYear={2020}
              toYear={2030}
            />
          </PopoverContent>
        </Popover>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-1/4 rounded-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          No orders found for your filters.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          {item.title} — ﷼ {item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 font-semibold">
                    ﷼ {order.total.toFixed(2)}
                  </td>
                  <td className="p-3 text-sm capitalize">
                    {order.status || "pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
