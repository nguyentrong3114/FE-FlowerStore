'use client';
import Banner from "@/components/ui/Banner";
import Brand from "@/components/ui/Brand";
import Collections from "@/components/ui/Collections";
import Comment from "@/components/ui/Comment";
import InfiniteCommentColumn from "@/components/ui/CommentRow";
import CommentRow from "@/components/ui/CommentRow";
import IntroVideo from "@/components/ui/IntroVideo";
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

export default function Home() {
  const { t } = useLanguage();
  const testimonials = [
    {
      name: "Ngọc Anh",
      username: "@ngocanh",
      message: "Hương thơm quyến rũ và sang trọng, lưu hương suốt cả ngày làm mình cảm thấy tự tin hơn rất nhiều.",
    },
    {
      name: "Minh Tú",
      username: "@minhtu",
      message: "Chai nước hoa này đúng là tình yêu từ cái nhìn đầu tiên. Mùi thơm độc đáo và khác biệt hoàn toàn.",
    },
    {
      name: "Lan Phương",
      username: "@lanphuong",
      message: "Mỗi lần xịt đều mang lại cảm giác như đang bước vào một khu vườn hoa đầy nắng. Tuyệt vời!",
    },
    {
      name: "Hoàng Dũng",
      username: "@hoangdung",
      message: "Mùi hương nam tính, mạnh mẽ nhưng vẫn đầy tinh tế. Phù hợp cả khi đi làm lẫn đi chơi.",
    },
    {
      name: "Thảo My",
      username: "@thaomy",
      message: "Chưa bao giờ mình nhận được nhiều lời khen như vậy khi dùng nước hoa. Mùi nhẹ nhàng nhưng cực kỳ cuốn hút.",
    },
    {
      name: "Khánh Linh",
      username: "@khanhlinh",
      message: "Mình rất kén nước hoa nhưng dòng này khiến mình mê ngay từ lần thử đầu tiên. Quá đỉnh!",
    },
    {
      name: "Bảo Long",
      username: "@baolong",
      message: "Hương thơm có chiều sâu và thay đổi tinh tế theo thời gian. Đúng chuẩn đẳng cấp quốc tế.",
    },
    {
      name: "Yến Nhi",
      username: "@yennhi",
      message: "Một mùi hương đầy nữ tính và quyến rũ. Mỗi khi dùng là mình cảm thấy tự tin và nổi bật hơn hẳn.",
    },
    {
      name: "Trí Nguyễn",
      username: "@trineguyen",
      message: "Mình đã thử nhiều loại nhưng đây là chai nước hoa đầu tiên khiến người yêu mình phải hỏi tên!",
    },
    {
      name: "Mai Hương",
      username: "@maihuong",
      message: "Độ lưu hương tốt, mùi lại sang và hiện đại. Xứng đáng từng đồng bỏ ra.",
    }
  ];
  
  return (
    <div>

      {/* Video centered */}
      <div className="w-full flex justify-center mb-8 ">

        <div className="w-2/3 mt-2">
          <IntroVideo
            videoUrl="/videos/intro.mp4"
            altText="Introductory Video"
          />
        </div>
      </div>

      <div className="text-center my-8 text-2xl font-bold">
        <h2 className="text-lg">
          {t("slogan")}
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[800px]">
          <Banner />
        </div>
      </div>
      <Brand />
      <Collections />
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <span className="text-gray-500 text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl font-bold mt-2">What our users say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfiniteCommentColumn comments={testimonials.slice(0, 3)} duration={8} />
          <InfiniteCommentColumn comments={testimonials.slice(3, 6)} duration={10} />
          <InfiniteCommentColumn comments={testimonials.slice(4, 7)} duration={12} />
        </div>
      </section>

    </div>
  );
}
