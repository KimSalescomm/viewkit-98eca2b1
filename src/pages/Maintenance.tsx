import { Wrench } from "lucide-react";

const Maintenance = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-6 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
      <Wrench className="h-10 w-10 text-blue-600" />
    </div>
    <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
      시스템 점검 중입니다
    </h1>
    <p className="mb-2 max-w-md text-base text-gray-600 leading-relaxed">
      더 나은 서비스를 위해 점검 중입니다.
      <br />
      잠시 후 다시 이용해 주세요.
    </p>
    <p className="text-sm text-gray-400">
      이용에 불편을 드려 죄송합니다.
    </p>
  </div>
);

export default Maintenance;
