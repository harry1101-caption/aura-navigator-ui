
import { Goal } from "@/types/gantt";

export const mockGoals: Goal[] = [
  {
    id: "goal1",
    title: "Phát hành sản phẩm version 3.0",
    owner: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    progress: 33,
    startDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 4, 15),
    expanded: true,
    milestones: [
      {
        id: "milestone1",
        title: "Tăng doanh thu lên 100 triệu VND từ bản v3.0",
        progress: 0,
        startDate: new Date(2025, 3, 5),
        endDate: new Date(2025, 4, 20),
      },
      {
        id: "milestone2",
        title: "Tích hợp tính năng QR code thanh toán",
        progress: 33,
        startDate: new Date(2025, 4, 1),
        endDate: new Date(2025, 4, 25),
      }
    ]
  },
  {
    id: "goal2",
    title: "Lên chiến dịch quảng cáo tính năng AI",
    owner: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    progress: 33,
    startDate: new Date(2025, 4, 10),
    endDate: new Date(2025, 5, 25),
    expanded: true,
    milestones: [
      {
        id: "milestone3",
        title: "Xây dựng thông điệp và nội dung quảng cáo",
        progress: 0,
        startDate: new Date(2025, 4, 12),
        endDate: new Date(2025, 4, 28),
      },
      {
        id: "milestone4",
        title: "Triển khai chiến dịch trên các kênh truyền thông",
        progress: 0,
        startDate: new Date(2025, 4, 20),
        endDate: new Date(2025, 5, 15),
      }
    ]
  },
  {
    id: "goal3",
    title: "Cắt giảm chi phí để đạt lợi nhuận",
    owner: {
      name: "David Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    progress: 33,
    startDate: new Date(2025, 4, 25),
    endDate: new Date(2025, 5, 25),
    expanded: false,
    milestones: []
  },
  {
    id: "goal4",
    title: "Hoàn thành bộ nhận diện thương hiệu số",
    owner: {
      name: "Mark Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    progress: 100,
    startDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 4, 20),
    expanded: false,
    milestones: []
  },
  {
    id: "goal5",
    title: "Đo lường brand awareness",
    owner: {
      name: "Jennifer Lee",
      avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    progress: 33,
    startDate: new Date(2025, 4, 28),
    endDate: new Date(2025, 5, 30),
    expanded: false,
    milestones: []
  }
];
