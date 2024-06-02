export default function Figma() {
  return (
    <div class="w-[1440px] h-[680px] relative bg-white flex-col justify-start items-start inline-flex">
      <div class="w-[725px] h-[680px] bg-white justify-end items-center inline-flex">
        <div class="justify-start items-start inline-flex">
          <div class="w-[725px] h-[680px] bg-white justify-center items-center flex">
            <img
              class="w-[725px] h-[822px]"
              src="https://via.placeholder.com/725x822"
            />
          </div>
          <div class="w-[725px] h-[680px] bg-white justify-center items-center flex">
            <img
              class="w-[725px] h-[822px]"
              src="https://via.placeholder.com/725x822"
            />
          </div>
          <div class="w-[725px] h-[680px] bg-white justify-center items-center flex">
            <img
              class="w-[725px] h-[822px]"
              src="https://via.placeholder.com/725x822"
            />
          </div>
        </div>
      </div>
      <div class="flex-col justify-start items-start gap-4 inline-flex">
        <div class="p-3 bg-blue-100 rounded-xl justify-start items-center gap-2.5 inline-flex">
          <div class="text-center text-black text-sm font-normal font-['Inter'] leading-tight">
            Construction management plugin
          </div>
          <div class="w-4 h-4 relative"></div>
        </div>
        <div class="flex-col justify-center items-start gap-5 flex">
          <div class="w-[514px]">
            <span style="text-neutral-800 text-[64px] font-bold font-['DM Sans'] leading-[64px]">
              Quantity{" "}
            </span>
            <span style="text-purple-500 text-[64px] font-bold font-['DM Sans'] leading-[64px]">
              takeoff{" "}
            </span>
            <span style="text-neutral-800 text-[64px] font-bold font-['DM Sans'] leading-[64px]">
              just got easier and faster
            </span>
          </div>
          <div class="w-[537px] text-zinc-500 text-xl font-normal font-['DM Sans'] leading-normal">
            ADLM studio provides a door to the world of amazing knowledge and
            skill required for the usage of BIM tools <br />
            to be within the reach of Nigeria and Africa construction industry
            as a whole.
          </div>
          <div class="justify-center items-start gap-3 inline-flex">
            <div class="px-4 py-[14.50px] bg-neutral-800 rounded-lg justify-center items-center gap-2.5 flex">
              <div class="text-white text-base font-normal font-['DM Sans'] leading-tight">
                Request a demo
              </div>
            </div>
            <div class="h-12 px-4 py-[14.50px] bg-neutral-100 rounded-lg border border-gray-200 justify-center items-center gap-2.5 flex">
              <div class="w-4 h-4 px-[3.33px] py-[3px] justify-center items-center flex"></div>
              <div class="text-neutral-800 text-base font-normal font-['DM Sans'] leading-tight">
                Watch Video
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="justify-start items-center gap-2 inline-flex">
        <div class="w-2 h-2 bg-white rounded-full"></div>
        <div class="w-3 h-3 bg-white rounded-full"></div>
        <div class="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
