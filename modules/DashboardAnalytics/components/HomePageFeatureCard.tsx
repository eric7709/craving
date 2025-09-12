import React from "react";

type Props = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
};

export default function HomePageFeatureCard(props: Props) {
  const { icon, iconBg, title, desc } = props;
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
      <div className={`p-2 sm:p-2.5 ${iconBg} rounded-full w-fit mb-2`}>
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
    </div>
  );
}
