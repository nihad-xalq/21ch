import Image from 'next/image';

const Logo = () => (
    <Image
        src="/21.png"
        alt="Logo"
        width={0}
        height={0}
        sizes="100vw"
        className="w-[100px] h-auto"
    />
);

export default Logo;
