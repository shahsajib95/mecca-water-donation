

export function AuthSideBanner() {
  return (
    <section className="lg:block">
      <div className="ml-0 flex h-[calc(100vh)] w-full items-center justify-center bg-primary">
        <div className="container flex justify-center">
          <div>
            <img src="/Cis_finel_logo.png" className="h-20" />
            <h1 className="text-4xl text-white">Welcome to Qatrat </h1>
          </div>
          {/* <p className="mt-4 text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p> */}
        </div>
      </div>
    </section>
  );
}
