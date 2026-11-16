'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function ArticleNavbar() {
  const [lang, setLang] = useState<'ko'|'ja'|'en'>('ko');
  return <Navbar lang={lang} setLang={setLang} />;
}
