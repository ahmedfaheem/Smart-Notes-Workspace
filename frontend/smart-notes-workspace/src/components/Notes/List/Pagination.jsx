import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ totalPages, safePage, start, totalNotes, PER_PAGE, goTo, getPageNumbers }) {
  return (
    <>
          {totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Range label */}
              <p className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                Showing{' '}
                <span className="font-semibold text-gray-900 dark:text-gray-100">{start + 1}</span>
                {' '}–{' '}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {Math.min(start + PER_PAGE, totalPages)}
                </span>
                {' '}of{' '}
                <span className="font-semibold text-gray-900 dark:text-gray-100">{totalPages}</span>
                {' '}notes
              </p>

              {/* Page buttons */}
              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                {/* Prev */}
                <button
                  onClick={() => goTo(safePage - 1)}
                  disabled={safePage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((p, i) =>
                  p === '…' ? (
                    <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goTo(p)}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                        p === safePage
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                          : 'border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goTo(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

         </>
  )
}
