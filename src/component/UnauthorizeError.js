// file: /component/UnauthorizeError.js
function UnauthorizeError() {
  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-yellow-600">คุณไม่มีสิทธ์เข้าถึงรายการนี้</p>
    </div>
  );
}

export default UnauthorizeError;
