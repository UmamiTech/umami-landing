"use client";

import { useCallback, useEffect, useState } from "react";
import { APP_URL } from "@/lib/app";

/**
 * Human check for the free-trial form.
 *
 * The grid and the prompt come from the app (`GET /api/auth/captcha`); the
 * correct answer never leaves that server, so this component only reports which
 * tiles were tapped. Challenges are single-use — bump `refreshKey` after a
 * failed submit to pull a fresh one.
 *
 * It guards a form that creates a real restaurant in the production database,
 * which is why the trial form has one and the contact form doesn't.
 */

type Tile = { id: number; emoji: string };
type Challenge = { challengeId: string; prompt: string; tiles: Tile[] };

export type FoodCheckValue = { challengeId: string; selected: number[] };

export default function FoodCheck({
  onChange,
  refreshKey = 0,
}: {
  onChange: (value: FoodCheckValue | null) => void;
  refreshKey?: number;
}) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    setSelected([]);
    onChange(null);
    try {
      const res = await fetch(`${APP_URL}/api/auth/captcha`);
      if (!res.ok) throw new Error("captcha unavailable");
      const data: Challenge = await res.json();
      setChallenge(data);
      onChange({ challengeId: data.challengeId, selected: [] });
    } catch {
      setChallenge(null);
      setFailed(true);
    } finally {
      setLoading(false);
    }
    // onChange is a setState wrapper from the parent; re-running on its identity
    // would refetch the challenge on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  function toggle(id: number) {
    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      if (challenge) onChange({ challengeId: challenge.challengeId, selected: next });
      return next;
    });
  }

  return (
    <div data-ui className="ui-card p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-medium">
          {challenge ? challenge.prompt : "Quick food check"}
        </span>
        <button
          type="button"
          onClick={load}
          className="text-[14px] font-medium text-brand-ink hover:underline"
        >
          Show another
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-black/5"
            />
          ))}
        </div>
      ) : failed ? (
        <p className="text-[14px] text-[#6b6b6b] py-3 text-center">
          Couldn&rsquo;t load the check.{" "}
          <button
            type="button"
            onClick={load}
            className="font-medium text-brand-ink underline"
          >
            Try again
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {challenge?.tiles.map((tile) => {
            const isSelected = selected.includes(tile.id);
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => toggle(tile.id)}
                aria-pressed={isSelected}
                className={`aspect-square rounded-lg text-2xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-[#fdebdc] border-2 border-brand"
                    : "bg-[#f7f7f5] border border-black/10 hover:bg-[#efefec]"
                }`}
              >
                <span aria-hidden="true">{tile.emoji}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="text-[13px] text-[#6b6b6b] mt-2">
        Tap every match, then continue.
      </p>
    </div>
  );
}
