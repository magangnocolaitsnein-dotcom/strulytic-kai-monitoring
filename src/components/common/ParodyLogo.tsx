import React from 'react';

interface ParodyLogoProps {
  className?: string;
  variant?: 'rai' | 'kai_parody' | 'k_ai';
  width?: number | string;
  height?: number | string;
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const ParodyLogo: React.FC<ParodyLogoProps> = ({
  className = '',
  variant = 'rai',
  width = 240,
  height = 90,
  showSubtitle = false,
  subtitleText = 'PROPOSAL DEMO • BUKAN LOGO RESMI'
}) => {
  // Brand colors matching the official KAI palette
  const NAVY_BLUE = '#1D2B6C';
  const VIBRANT_ORANGE = '#F37021';
  const WHITE = '#FFFFFF';

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 540 200"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible select-none drop-shadow-2xs"
      >
        <defs>
          <filter id="subtle-shadow" x="-5%" y="-5%" width="110%" height="110%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
          <clipPath id="logo-clip">
            <rect x="0" y="0" width="540" height="200" rx="4" />
          </clipPath>
        </defs>

        {/* Global forward italic slant (-13.5 degrees) matching the authentic KAI dynamism */}
        <g transform="skewX(-13.5) translate(45, 10)">
          {/* ========================================================= */}
          {/* VARIANT 1: RAI (Rel Angkutan Indonesia / Rail AI)         */}
          {/* 1-to-1 visual silhouette & weight rhythm parody of KAI   */}
          {/* ========================================================= */}
          {variant === 'rai' && (
            <g id="parody-rai">
              {/* LETTER 1: 'R' (Deep Navy Blue #1D2B6C) */}
              <g id="letter-R">
                {/* Main vertical stem with subtle rounded outer corners */}
                <path
                  d="M 28 24
                     C 28 20, 32 16, 38 16
                     L 78 16
                     C 84 16, 88 20, 88 24
                     L 88 152
                     C 88 156, 84 160, 78 160
                     L 38 160
                     C 32 160, 28 156, 28 152
                     Z"
                  fill={NAVY_BLUE}
                />
                {/* Upper bowl of R */}
                <path
                  d="M 80 16
                     L 142 16
                     C 168 16, 186 32, 186 58
                     C 186 82, 168 96, 140 96
                     L 80 96
                     Z"
                  fill={NAVY_BLUE}
                />
                {/* Inner counter (hole) of upper R bowl */}
                <path
                  d="M 88 44
                     L 132 44
                     C 142 44, 148 49, 148 57
                     C 148 65, 142 70, 132 70
                     L 88 70
                     Z"
                  fill={WHITE}
                />
                {/* Diagonal right leg of R (same slant and rounded terminal as K's leg) */}
                <path
                  d="M 108 92
                     L 156 153
                     C 160 158, 166 160, 172 160
                     L 194 160
                     C 200 160, 203 154, 199 149
                     L 144 88
                     C 134 88, 122 89, 108 92
                     Z"
                  fill={NAVY_BLUE}
                />
              </g>

              {/* LETTER 2: 'A' (Vibrant Speed Orange #F37021 + Negative-space Speedline Swoosh) */}
              <g id="letter-A">
                {/* Upper portion of 'A' above the swoosh */}
                <path
                  d="M 276 16
                     C 282 16, 288 20, 292 27
                     L 316 75
                     L 242 98
                     L 262 27
                     C 265 20, 270 16, 276 16
                     Z"
                  fill={VIBRANT_ORANGE}
                />
                {/* Inner triangular counter of 'A' */}
                <path
                  d="M 276 46
                     L 265 74
                     L 289 67
                     Z"
                  fill={WHITE}
                />

                {/* Lower left leg of 'A' below the white speedline */}
                <path
                  d="M 218 114
                     L 192 153
                     C 188 158, 192 160, 198 160
                     L 254 160
                     L 262 138
                     L 230 114
                     Z"
                  fill={VIBRANT_ORANGE}
                />

                {/* Lower right leg of 'A' below the swoosh */}
                <path
                  d="M 314 98
                     L 348 154
                     C 351 158, 347 160, 342 160
                     L 282 160
                     L 284 140
                     L 330 112
                     Z"
                  fill={VIBRANT_ORANGE}
                />

                {/* White speedline cutting across from bottom-left of A upward into I */}
                <path
                  d="M 186 142
                     L 236 102
                     L 468 44
                     L 466 52
                     L 256 122
                     L 214 154
                     Z"
                  fill={WHITE}
                />

                {/* Orange dynamic rail speed-wedge inside the swoosh piercing across into I */}
                <path
                  d="M 198 142
                     L 254 116
                     L 464 48
                     L 262 126
                     Z"
                  fill={VIBRANT_ORANGE}
                />
              </g>

              {/* LETTER 3: 'I' (Deep Navy Blue #1D2B6C, sliced by the white swoosh) */}
              <g id="letter-I">
                {/* Upper segment of I above swoosh */}
                <path
                  d="M 390 16
                     L 446 16
                     C 454 16, 460 22, 460 30
                     L 460 42
                     L 390 58
                     Z"
                  fill={NAVY_BLUE}
                />

                {/* Lower segment of I below swoosh */}
                <path
                  d="M 390 66
                     L 460 52
                     L 460 152
                     C 460 156, 456 160, 450 160
                     L 398 160
                     C 392 160, 390 156, 390 152
                     Z"
                  fill={NAVY_BLUE}
                />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* VARIANT 2: K.AI (Kereta AIoT / Digital Proposal Variant)  */}
          {/* ========================================================= */}
          {variant === 'k_ai' && (
            <g id="parody-k-ai">
              {/* LETTER 1: 'K' */}
              <g id="letter-K">
                <path
                  d="M 28 24
                     C 28 20, 32 16, 38 16
                     L 78 16
                     C 84 16, 88 20, 88 24
                     L 88 152
                     C 88 156, 84 160, 78 160
                     L 38 160
                     C 32 160, 28 156, 28 152
                     Z"
                  fill={NAVY_BLUE}
                />
                {/* Upper arm of K */}
                <path
                  d="M 88 88
                     L 148 24
                     C 152 20, 158 16, 164 16
                     L 190 16
                     C 196 16, 198 22, 194 27
                     L 122 96
                     Z"
                  fill={NAVY_BLUE}
                />
                {/* Lower arm of K */}
                <path
                  d="M 112 88
                     L 164 153
                     C 168 158, 174 160, 180 160
                     L 204 160
                     C 210 160, 213 154, 209 149
                     L 146 82
                     Z"
                  fill={NAVY_BLUE}
                />
                {/* AI separator dot (protective parody mark) */}
                <circle cx="218" cy="148" r="8" fill={VIBRANT_ORANGE} />
              </g>

              {/* LETTER 2: 'A' (Orange with rail swoosh) */}
              <g id="letter-A-k-ai">
                <path
                  d="M 306 16
                     C 312 16, 318 20, 322 27
                     L 344 75
                     L 272 98
                     L 292 27
                     C 295 20, 300 16, 306 16
                     Z"
                  fill={VIBRANT_ORANGE}
                />
                <path
                  d="M 306 46
                     L 295 74
                     L 319 67
                     Z"
                  fill={WHITE}
                />
                <path
                  d="M 248 114
                     L 226 153
                     C 222 158, 226 160, 232 160
                     L 284 160
                     L 292 138
                     L 260 114
                     Z"
                  fill={VIBRANT_ORANGE}
                />
                <path
                  d="M 342 98
                     L 376 154
                     C 379 158, 375 160, 370 160
                     L 312 160
                     L 314 140
                     L 358 112
                     Z"
                  fill={VIBRANT_ORANGE}
                />
                {/* White speedline */}
                <path
                  d="M 218 142
                     L 266 102
                     L 490 44
                     L 488 52
                     L 286 122
                     L 244 154
                     Z"
                  fill={WHITE}
                />
                <path
                  d="M 230 142
                     L 284 116
                     L 486 48
                     L 292 126
                     Z"
                  fill={VIBRANT_ORANGE}
                />
              </g>

              {/* LETTER 3: 'I' */}
              <g id="letter-I-k-ai">
                <path
                  d="M 416 16
                     L 472 16
                     C 480 16, 486 22, 486 30
                     L 486 42
                     L 416 58
                     Z"
                  fill={NAVY_BLUE}
                />
                <path
                  d="M 416 66
                     L 486 52
                     L 486 152
                     C 486 156, 482 160, 476 160
                     L 424 160
                     C 418 160, 416 156, 416 152
                     Z"
                  fill={NAVY_BLUE}
                />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* VARIANT 3: KAI PARODY (Slightly stylized letter terminals)*/}
          {/* ========================================================= */}
          {variant === 'kai_parody' && (
            <g id="parody-kai-stylized">
              {/* K */}
              <path
                d="M 28 24
                   C 28 20, 32 16, 38 16
                   L 78 16
                   C 84 16, 88 20, 88 24
                   L 88 152
                   C 88 156, 84 160, 78 160
                   L 38 160
                   C 32 160, 28 156, 28 152
                   Z"
                fill={NAVY_BLUE}
              />
              <path
                d="M 88 88
                   L 148 24
                   C 152 20, 158 16, 164 16
                   L 188 16
                   C 194 16, 196 22, 192 27
                   L 122 96
                   Z"
                fill={NAVY_BLUE}
              />
              <path
                d="M 112 88
                   L 164 153
                   C 168 158, 174 160, 180 160
                   L 204 160
                   C 210 160, 213 154, 209 149
                   L 146 82
                   Z"
                fill={NAVY_BLUE}
              />

              {/* A with orange + white speedline */}
              <path
                d="M 286 16
                   C 292 16, 298 20, 302 27
                   L 326 75
                   L 252 98
                   L 272 27
                   C 275 20, 280 16, 286 16
                   Z"
                fill={VIBRANT_ORANGE}
              />
              <path d="M 286 46 L 275 74 L 299 67 Z" fill={WHITE} />
              <path
                d="M 228 114
                   L 202 153
                   C 198 158, 202 160, 208 160
                   L 264 160
                   L 272 138
                   L 240 114
                   Z"
                fill={VIBRANT_ORANGE}
              />
              <path
                d="M 324 98
                   L 358 154
                   C 361 158, 357 160, 352 160
                   L 292 160
                   L 294 140
                   L 340 112
                   Z"
                fill={VIBRANT_ORANGE}
              />
              {/* White speedline */}
              <path
                d="M 196 142
                   L 246 102
                   L 478 44
                   L 476 52
                   L 266 122
                   L 224 154
                   Z"
                fill={WHITE}
              />
              <path
                d="M 208 142
                   L 264 116
                   L 474 48
                   L 272 126
                   Z"
                fill={VIBRANT_ORANGE}
              />

              {/* I */}
              <path
                d="M 400 16
                   L 456 16
                   C 464 16, 470 22, 470 30
                   L 470 42
                   L 400 58
                   Z"
                fill={NAVY_BLUE}
              />
              <path
                d="M 400 66
                   L 470 52
                   L 470 152
                   C 470 156, 466 160, 460 160
                   L 408 160
                   C 402 160, 400 156, 400 152
                   Z"
                fill={NAVY_BLUE}
              />
            </g>
          )}
        </g>
      </svg>

      {showSubtitle && (
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#64748B] font-semibold mt-1">
          {subtitleText}
        </span>
      )}
    </div>
  );
};
