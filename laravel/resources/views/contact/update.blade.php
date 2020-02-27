@extends('layouts.main')

@section('head-title')Update contact #{{ $contact->id }} @endsection

@section('content')
    <h1>Contact page</h1>

    <form action="{{ route('contact-save-update', $contact->id) }}" method="post">
        @csrf

        <div class="form-group">
            <label for="name">Input name</label>
            <input type="text" name="name" value="{{ $contact->name }}" placeholder="Input name" id="name" class="form-control">
        </div>

        <div class="form-group">
            <label for="email">Input email</label>
            <input type="text" name="email" value="{{ $contact->email }}" placeholder="Input email" id="email" class="form-control">
        </div>

        <div class="form-group">
            <label for="subject">Input title message</label>
            <input type="text" name="subject" value="{{ $contact->subject }}" placeholder="Input title message" id="subject" class="form-control">
        </div>

        <div class="form-group">
            <label for="message">Input message</label>
            <textarea name="message" placeholder="Input message" id="message" class="form-control">{{ $contact->message }}</textarea>
        </div>

        <button type="submit" class="btn btn-success">Update</button>
    </form>
@endsection
