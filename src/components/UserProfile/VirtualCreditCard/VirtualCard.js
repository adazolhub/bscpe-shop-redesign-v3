import CardSVG from "./CardSVG";

function VirtualCard({ type, bank, card_number, card_holder, ...props }) {
    return (
      <div className="relative mx-auto text-gray-500 h-fit">
        <CardSVG className="w-64" {...props} />
        <p className="absolute top-8 left-5  text-[0.5em] text-gray-500 font-thin">
          Virtual Card
        </p>
        <p className="absolute text-[0.65em] top-8 right-5 max-w-[16ch] text-right font-bold">
          {bank}
        </p>
        <p className="absolute text-lg font-light bottom-14 left-5 max-w-[20ch] text-right text-gray-400">
          {card_number}
        </p>
        <p className="absolute text-xs bottom-10 left-5 max-w-[20ch] text-right text-gray-500">
          {card_holder}
        </p>
        <p className="absolute text-lg italic font-thin text-right text-gray-300 right-5 bottom-8">
          {type}
        </p>
      </div>
    );
  }

export default VirtualCard