@extends('layouts.main')

@section('head-title')Contact page @endsection

@section('content')
    <h1>Contact page</h1>

    <form action="{{ route('contact-form') }}" method="post">
        @csrf

        <div class="form-group">
            <label for="name">Input name</label>
            <input type="text" name="name" placeholder="Input name" id="name" class="form-control">
        </div>

        <div class="form-group">
            <label for="email">Input email</label>
            <input type="text" name="email" placeholder="Input email" id="email" class="form-control">
        </div>

        <div class="form-group">
            <label for="subject">Input title message</label>
            <input type="text" name="subject" placeholder="Input title message" id="subject" class="form-control">
        </div>

        <div class="form-group">
            <label for="message">Input message</label>
            <textarea name="message" placeholder="Input message" id="message" class="form-control"></textarea>
        </div>

        <button type="submit" class="btn btn-success">Send</button>
    </form>
@endsection
